import {describe, it} from "@leyyo/core";
import {sampleDash} from "./samples/dash";
import {sampleKeyword} from "./samples/keyword";
import {samplePlain} from "./samples/plain";

sampleDash(describe, it);
sampleKeyword(describe, it);
samplePlain(describe, it);