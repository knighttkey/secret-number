import React, {
  DragEvent,
  useRef,
  useState,
  MouseEvent,
  useEffect,
  ChangeEvent,
} from "react";
import "./../styles/SecretContainer.scss";

type Props = {};

export default (props: Props) => {
  const {} = props;
  const originRef = useRef<HTMLInputElement>(null);
  const decodeRef = useRef<HTMLInputElement>(null);
  const [encodeString, setEncodeString] = useState<string>("");
  const [decodeString, setDecodeString] = useState<string>("");
  const [secretNumber, setSecretNumber] = useState<number>(1);
  const [decodeNumber, setDecodeNumber] = useState<number>(1);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphabetArray = [
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
      if (originIndex + secretNumber < 26) {
        additionNumber = originIndex + secretNumber;
      } else {
        additionNumber = originIndex + secretNumber - 26;
      }
      if (additionNumber < 0) return;
      console.log('additionNumber', additionNumber)
      let result;
      if (upper) {
        result = alphabetArray[additionNumber];
      } else {
        result = alphabetArray[additionNumber].toLowerCase();
      }
      return originIndex === -1 ? item : result;
    });
    setEncodeString(replacedArray.join(""));
  };
  const changeSecretNumber = (evt:ChangeEvent) => {
    let secretNo = (evt.target as HTMLInputElement).value;
    setSecretNumber(Number(secretNo))
    if(!originRef.current) return;
    encode(originRef.current.value)

  }
  const changeDecodeNumber = (evt:ChangeEvent) => {
    let decodeNo = (evt.target as HTMLInputElement).value;
    setDecodeNumber(Number(decodeNo))
    if(!decodeRef.current) return;
    decode(decodeRef.current.value)
  }

  const decode = (evtStr:string) => {
    let instantSecretString = evtStr;
    let instantSecretArray = instantSecretString.split("");
    let decodedArray = instantSecretArray.map((item)=>{
      console.log('item', item)
      let upper = isUpperCase(item);
      let originIndex = alphabet.indexOf(item.toUpperCase());
      let additionNumber;
      if (originIndex - decodeNumber >= 0) {
        additionNumber = originIndex - decodeNumber;
      } else {
        additionNumber = 26 + originIndex - decodeNumber;
      }
      if (additionNumber < 0) return;
      let result;
      if (upper) {
        result = alphabetArray[additionNumber];
      } else {
        result = alphabetArray[additionNumber].toLowerCase();
      }
      return originIndex === -1 ? item : result;
    })
    setDecodeString(decodedArray.join(""));
  }
  return (
    <div className="secret_container">
      <div className="encode_area">
      <div className="title">Encode</div>
        <input
          className="secret_number"
          type="number"
          value={secretNumber}
          onChange={(evt) => changeSecretNumber(evt)}
          min={1}
          max={26}
          step={1}
        ></input>
        <input
          className="origin_string"
          type="text"
          onChange={(evt) => encode(evt.target.value)}
          ref={originRef}
        ></input>
        <div className="result_string">{encodeString}</div>
        
      </div>
      <div className="decode_area">
      <div className="title">Decode</div>
      <input
          className="decode_number"
          type="number"
          value={decodeNumber}
          onChange={(evt) => changeDecodeNumber(evt)}
          min={1}
          max={26}
          step={1}
        ></input>
      <input
          className="secret_string"
          type="text"
          onChange={(evt) => decode(evt.target.value)}
          ref={decodeRef}
        ></input>
        <div className="decode_result_string">{decodeString}</div>
      </div>
    </div>
  );
};
