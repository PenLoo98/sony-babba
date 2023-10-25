"use client";
import { Modal,Box} from "@mui/material";
import { useState } from "react";

type ModalProps = {
    children: React.ReactNode;
  };

export default function ModalCustom({ children }: ModalProps) {
    const [show, setShow] = useState(false);

    return (        
        <Modal
                open={show}
                onClose={() => setShow(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div
                  className="edit-profile"
                  style={{
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "150px",
                  }}
                >
                  <Box style={{ margin: "30px" }}>
                    {children}
                  </Box>
                </div>
              </Modal>
    )
}