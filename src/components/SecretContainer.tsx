import React, { useRef, useState, useEffect } from "react";
import "./../styles/SecretContainer.scss";

type Props = {};

export default (props: Props) => {
  const {} = props;
  const originRef = useRef<HTMLInputElement>(null);
  const decryptRef = useRef<HTMLInputElement>(null);
  const encryptResultRef = useRef<HTMLInputElement>(null);
  const decryptResultRef = useRef<HTMLInputElement>(null);
  const [encryptString, setEncryptString] = useState<string>("");
  const [decryptString, setDecryptString] = useState<string>("");
  const [secretNumber, setSecretNumber] = useState<number>(1);
  const [decryptNumber, setDecryptNumber] = useState<number>(1);
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

  useEffect(()=>{
    if (/Line/.test(navigator.userAgent)) {
      window.location.href = window.location.href + "?openExternalBrowser=1";
    } 
  },[])

  useEffect(() => {
    if (!originRef.current) return;
    encrypt(originRef.current.value);
  }, [secretNumber]);

  useEffect(() => {
    if (!decryptRef.current) return;
    decrypt(decryptRef.current.value);
  }, [decryptNumber]);

  const isUpperCase = (str: string) => {
    return str != str.toLowerCase() && str === str.toUpperCase();
  };
  const encrypt = (evtStr: string) => {
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
    setEncryptString(replacedArray.join(""));
  };

  const decrypt = (evtStr: string) => {
    let instantSecretString = evtStr;
    let instantSecretArray = instantSecretString.split("");
    let decryptdArray = instantSecretArray.map((item) => {
      let upper = isUpperCase(item);
      let originIndex = alphabet.indexOf(item.toUpperCase());
      let additionNumber;
      let indexCount = originIndex - decryptNumber;
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
    setDecryptString(decryptdArray.join(""));
  };
  // const queryOpts = { name: 'clipboard-read', allowWithoutGesture: false };
  // const permissionStatus = await navigator.permissions.query(queryOpts);
  // // Will be 'granted', 'denied' or 'prompt':
  // console.log(permissionStatus.state);
  
  // // Listen for changes to the permission state
  // permissionStatus.onchange = () => {
  //   console.log(permissionStatus.state);
  // };
  const copySecret = async () => {
    let ele = document.querySelector(".result_string");
    // ele.focus();
    if (!ele) return;
    
    await navigator.clipboard.writeText(ele.innerHTML).then(() => {
      alert("successfully copied");

    })
    .catch((e) => {
      console.log('e',e)
      alert("something went wrong");
    });
  };
  const copyResult = () => {
    let ele = document.querySelector(".decrypt_result_string");
    if (!ele) return;
    alert("copy successful");
    navigator.clipboard.writeText(ele.innerHTML);
  };
  return (
    <div className="secret_container">
      <div className="encrypt_area">
        <div className="title">Encrypt</div>
        <div className="top_row">
          <input
            className="secret_number"
            type="number"
            value={secretNumber}
            onChange={(evt) => setSecretNumber(Number(evt.target.value))}
            min={1}
            max={26}
            step={1}
          ></input>
          <input
            className="origin_string"
            type="text"
            onChange={(evt) => encrypt(evt.target.value)}
            ref={originRef}
            spellCheck={false}
          ></input>
        </div>
        <div className="bottom_row">
          <div className="result_string" ref={encryptResultRef}>
            {encryptString}
          </div>
          {/* <button onClick={CheckPermission}>ddd</button> */}
          <div
            className={`copy_btn ${encryptString ? "" : "disable"} `}
            onClick={() => copySecret()}
          >
            <div className="icon"></div>
          </div>
        </div>
      </div>
      <div className="decrypt_area">
        <div className="title">Decrypt</div>
        <div className="top_row">
          <input
            className="decrypt_number"
            type="number"
            value={decryptNumber}
            onChange={(evt) => setDecryptNumber(Number(evt.target.value))}
            min={1}
            max={25}
            step={1}
          ></input>
          <input
            className="secret_string"
            type="text"
            onChange={(evt) => decrypt(evt.target.value)}
            ref={decryptRef}
            spellCheck={false}
          ></input>
        </div>
        <div className="bottom_row">
          <div className="decrypt_result_string" ref={decryptResultRef}>
            {decryptString}
          </div>
          <div
            className={`copy_btn ${decryptString ? "" : "disable"} `}
            onClick={() => copyResult()}
          >
            <div className="icon"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
