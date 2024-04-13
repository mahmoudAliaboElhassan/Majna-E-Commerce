import React from "react";

import { IconButton, Slide, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

import { SearchBoxContainer, SerarchField } from "@styles/search";

function SlideSearch({ show, close, dir }) {
  const skills = ["html", "css", "javascript", "typescipt"];
  const { t } = useTranslation();

  return (
    <Slide direction={dir} timeout={500} in={show}>
      <SearchBoxContainer>
        <Autocomplete
          options={skills || []}
          fullWidth
          color="secondary"
          renderInput={(params) => (
            <SerarchField
              {...params}
              variant="standard"
              placeholder={t("search_product")}
            />
          )}
          freesolo
        />
        <IconButton>
          <SearchIcon
            sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
            color="secondary"
          />
        </IconButton>
        <IconButton
          onClick={close}
          sx={{ position: "absolute", top: "50px", right: "10px" }}
        >
          <CloseIcon sx={{ fontSize: "4rem" }} color="secondary" />
        </IconButton>
      </SearchBoxContainer>
    </Slide>
  );
}

export default React.memo(SlideSearch);
