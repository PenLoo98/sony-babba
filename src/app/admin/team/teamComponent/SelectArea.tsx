"use client";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

interface SelectAreaProps {
    area: string;
    setArea: (area: string) => void;
  }

export default function SelectArea({ area, setArea }: SelectAreaProps) {
  const handleChange = (event: any) => {
    setArea(event.target.value as string);
  };
  return (
    <div className="selectArea" style={{ width: "300px" }}>
      <FormControl fullWidth>
        <InputLabel>지역</InputLabel>
        <Select label="지역" value={area} onChange={handleChange}>
          <MenuItem value="서울">서울</MenuItem>
          <MenuItem value="경기도">경기도</MenuItem>
          <MenuItem value="인천">인천</MenuItem>
          <MenuItem value="강원도">강원도</MenuItem>
          <MenuItem value="충청북도">충청북도</MenuItem>
          <MenuItem value="충청남도">충청남도</MenuItem>
          <MenuItem value="대전">대전</MenuItem>
          <MenuItem value="경상북도">경상북도</MenuItem>
          <MenuItem value="경상남도">경상남도</MenuItem>
          <MenuItem value="대구">대구</MenuItem>
          <MenuItem value="울산">울산</MenuItem>
          <MenuItem value="부산">부산</MenuItem>
          <MenuItem value="전라북도">전라북도</MenuItem>
          <MenuItem value="전라남도">전라남도</MenuItem>
          <MenuItem value="광주">광주</MenuItem>
          <MenuItem value="제주도">제주도</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
