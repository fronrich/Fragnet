import process from "process";
import { exec } from "../../../utils/dirUtils.js";

// emulates files coming into queue
const debug = () => {
  const args = process.argv.slice(2);
  const queueDir = args[0];
  const load = 100;
  const timeout = 3;

  for (let time = 0; time < timeout; time++) {
    const files = load;
    for (let i = 0; i < files; i++) {
      let bs = "";
      for (let j = 0; j < files; j++) {
        bs += (Math.random() * 1000000).toString(2);
      }
      bs = bs.replace(".", "1");
      exec(`echo "${bs}" >> ${queueDir}dump_${i}_${time}.txt`);
    }
  }

  process.stdout.write("debug timeout");
};

debug();
