import { TextField, Button } from "@mui/material";
import { useState } from "react";

type TypeValidProps = {
  buttonText: string;
  validText: string;
  onClick: () => void;
};

export default function TypeValid(props: TypeValidProps) {
  // 입력한 내용 저장
  const [input, setInput] = useState("");
  // 입력한 내용 변경
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="TypeValid">
      <h3>
        {props.validText}를 입력해주세요
      </h3>
      <TextField
        variant="outlined"
        value={input}
        onChange={handleTypeChange}
      />
      {input === (props.validText) ? (
        <Button variant="outlined" onClick={props.onClick}>
          {props.buttonText}
        </Button>
      ) : (
        <Button variant="outlined" disabled>
          {props.buttonText}
        </Button>
      )}
    </div>
  );
}
