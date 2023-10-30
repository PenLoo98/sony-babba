"use client";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

interface SelectSportsProps {
  sports: string;
    onSportChange: (selectedSports: string) => void;
  }

export default function SelectSports({ sports: sports, onSportChange }: SelectSportsProps) {
  const handleChange = (event: any) => {
    onSportChange(event.target.value as string);
  };
  return (
    <div className="selectSport" style={{ width: "300px" }}>
      <FormControl fullWidth>
        <InputLabel>종목</InputLabel>
        <Select label="종목" value={sports} onChange={handleChange}>
          <MenuItem value="축구">축구</MenuItem>
          <MenuItem value="풋살">풋살</MenuItem>
          <MenuItem value="볼링">볼링</MenuItem>
          <MenuItem value="골프">골프</MenuItem>
          <MenuItem value="배드민턴">배드민턴</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
