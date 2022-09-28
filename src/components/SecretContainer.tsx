import React, {
  useRef,
  useState,
  useEffect,
} from "react";
import "./../styles/SecretContainer.scss";

type Props = {};

export default (props: Props) => {
  const {} = props;
  const originRef = useRef<HTMLInputElement>(null);
  const decodeRef = useRef<HTMLInputElement>(null);
  const encodeResultRef = useRef<HTMLInputElement>(null);
  const decodeResultRef = useRef<HTMLInputElement>(null);
  const [encodeString, setEncodeString] = useState<string>("");
  const [decodeString, setDecodeString] = useState<string>("");
  const [secretNumber, setSecretNumber] = useState<number>(1);
  const [decodeNumber, setDecodeNumber] = useState<number>(1);
  const alphabet = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphabetArray = [
    " ",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  useEffect(() => {
    if (!originRef.current) return;
    encode(originRef.current.value);
  }, [secretNumber]);

  useEffect(() => {
    if (!decodeRef.current) return;
    decode(decodeRef.current.value);
  }, [decodeNumber]);

  const isUpperCase = (str: string) => {
    return str != str.toLowerCase() && str === str.toUpperCase();
  };
  const encode = (evtStr: string) => {
    let instantString = evtStr;
    let instantArray = instantString.split("");
    let replacedArray = instantArray.map((item) => {
      let upper = isUpperCase(item);
      let originIndex = alphabet.indexOf(item.toUpperCase());
      let additionNumber;
      let indexCount = originIndex + secretNumber;
      if (originIndex <= 0) {
        additionNumber = 0;
      } else {
        if (indexCount <= 26) {
          additionNumber = indexCount;
        } else {
          let scale = Math.round(indexCount / 26);
          let mod = indexCount % 26;
          additionNumber = indexCount - 26;
        }
      }

      let result;
      if (additionNumber <= 0) {
        result = item;
      } else {
        if (upper) {
          result = alphabetArray[additionNumber];
        } else {
          result = alphabetArray[additionNumber].toLowerCase();
        }
      }
      return result;
    });
    setEncodeString(replacedArray.join(""));
  };

  const decode = (evtStr: string) => {
    let instantSecretString = evtStr;
    let instantSecretArray = instantSecretString.split("");
    let decodedArray = instantSecretArray.map((item) => {
      let upper = isUpperCase(item);
      let originIndex = alphabet.indexOf(item.toUpperCase());
      let additionNumber;
      let indexCount = originIndex - decodeNumber;
      if (originIndex <= 0) {
        additionNumber = 0;
      } else {
        if (indexCount >= 0) {
          additionNumber = indexCount;
        } else {
          let scale = Math.round(indexCount / 26);
          let mod = indexCount % 26;
          additionNumber = 26 + indexCount;
        }
      }
      let result;
      if (additionNumber <= 0) {
        result = item;
      } else {
        if (upper) {
          result = alphabetArray[additionNumber];
        } else {
          result = alphabetArray[additionNumber].toLowerCase();
        }
      }
      return result;
    });
    setDecodeString(decodedArray.join(""));
  };

  const copySecret = () => {
    if (!encodeResultRef.current) return;
    navigator.clipboard.writeText(encodeResultRef.current.innerText);
  };
  const copyResult = () => {
    if (!decodeResultRef.current) return;
    navigator.clipboard.writeText(decodeResultRef.current.innerText);
  };

  return (
    <div className="secret_container">
      <div className="encode_area">
        <div className="title">Encode</div>
        <div className="top_row">
          <input
            className="secret_number"
            type="number"
            value={secretNumber}
            // onChange={(evt) => changeSecretNumber(evt)}
            onChange={(evt) => setSecretNumber(Number(evt.target.value))}
            min={1}
            max={26}
            step={1}
          ></input>
          <input
            className="origin_string"
            type="text"
            onChange={(evt) => encode(evt.target.value)}
            ref={originRef}
            spellCheck={false}
          ></input>
        </div>
        <div className="bottom_row">
          <div className="result_string" ref={encodeResultRef}>
            {encodeString}
          </div>
          <div className={`copy_btn ${encodeString ? '':'disable'} `} onClick={() => copySecret()}>
            <div className="icon"></div>
          </div>
        </div>
      </div>
      <div className="decode_area">
        <div className="title">Decode</div>
        <div className="top_row">
        <input
          className="decode_number"
          type="number"
          value={decodeNumber}
          onChange={(evt) => setDecodeNumber(Number(evt.target.value))}
          min={1}
          max={25}
          step={1}
        ></input>
        <input
          className="secret_string"
          type="text"
          onChange={(evt) => decode(evt.target.value)}
          ref={decodeRef}
          spellCheck={false}
        ></input>
        </div>
        <div className="bottom_row">
        <div className="decode_result_string" ref={decodeResultRef}>{decodeString}</div>
        <div className={`copy_btn ${decodeString ? '':'disable'} `} onClick={() => copyResult()}>
            <div className="icon"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
