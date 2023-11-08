"use client";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

interface SelectSportsProps {
  sports: string;
  setSports: (sports: string) => void;
  }

export default function SelectSports({ sports, setSports }: SelectSportsProps) {
  const handleChange = (event: any) => {
    setSports(event.target.value as string);
  };
  return (
    <div className="selectSport" style={{ width: "300px" }}>
      <FormControl fullWidth>
        <InputLabel>종목</InputLabel>
        <Select label="종목" value={sports} onChange={handleChange}>
          <MenuItem value="축구">축구</MenuItem>
          <MenuItem value="풋살">풋살</MenuItem>
          <MenuItem value="농구">농구</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
