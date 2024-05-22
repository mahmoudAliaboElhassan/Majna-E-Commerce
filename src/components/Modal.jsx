import React, { useState } from "react";

import {
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Card,
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import UseMediaQueryHook from "@hooks/use-media-query";

function ModalSignup({ open_modal, close }) {
  const [type, setType] = useState("customer");

  const { t } = useTranslation();
  const [typeLabel, setTypeLabel] = useState(t("customer"));

  const handleTypeChange = (event) => {
    setType(event.target.value);
    setTypeLabel(t(event.target.value));
  };
  localStorage.setItem("type", type);
  const { isMatch } = UseMediaQueryHook();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMatch ? "auto" : "80%",
    height: isMatch ? "auto" : "80%",

    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <Modal
      open={open_modal}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Container maxWidth="md">
          <FormControl sx={{ display: "flex", justifyContent: "center" }}>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ textAlign: "center", mb: 2 }}
            >
              {t("select-type")}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="customer"
              name="radio-buttons-group"
              value={type}
              onChange={handleTypeChange}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                  <Card
                    raised
                    sx={{ p: 3, height: "150px", overflowY: "scroll" }}
                  >
                    <FormControlLabel
                      value="distributor"
                      control={<Radio />}
                      label={t("distributor")}
                    />
                    <Typography sx={{ textAlign: "center" }}>
                      {t("distributor_description")}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Card
                    raised
                    sx={{ p: 3, height: "150px", overflowY: "scroll" }}
                  >
                    <FormControlLabel
                      value="customer"
                      control={<Radio />}
                      label={t("customer")}
                    />
                    <Typography sx={{ textAlign: "center" }}>
                      {t("customer_description")}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  {" "}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={close}
                    fullWidth
                    component={Link}
                    to="/signup"
                    sx={{ textAlign: "center" }}
                  >
                    {t("create_account")}
                    {t(typeLabel)}
                  </Button>
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Container>
      </Box>
    </Modal>
  );
}

export default React.memo(ModalSignup);
