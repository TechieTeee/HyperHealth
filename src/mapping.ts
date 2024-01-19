//@ts-ignore
import { require } from "@hyperoracle/zkgraph-lib";
import { Bytes, Event, Block, ByteArray } from "@hyperoracle/zkgraph-lib";

// Address for the electronic medical records (EMR) contract
const emrContractAddress = Bytes.fromHexString(
  "0xEMRContractAddress"
);

// Event signature for EMR transfers
const esigEMRTransfer = Bytes.fromHexString(
  "0xEMRTransferEventSignature"
);

export function handleBlocks(blocks: Block[]): Bytes {
  // Get the events from the latest block
  let events: Event[] = blocks[0].events;

  // Create an array to store EMR holders
  let emrHolders: ByteArray = ByteArray.empty();

  // Iterate through events in reverse order to find EMR transfers
  for (let i = events.length - 1; i >= 0; i--) {
    // Check if the event is a transfer event for the EMR contract
    if (
      events[i].address == emrContractAddress &&
      events[i].esig == esigEMRTransfer
    ) {
      // Concatenate the holder's information stored in topic 2
      emrHolders.concat(events[i].topic2);
    }
  }

  // Convert the array of EMR holders to Bytes
  let state = Bytes.fromByteArray(emrHolders);

  return state;
}
