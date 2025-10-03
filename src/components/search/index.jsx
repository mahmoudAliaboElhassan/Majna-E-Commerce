import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import { useTranslation } from "react-i18next"
import { useTheme } from "@mui/material/styles"
import { useDispatch, useSelector } from "react-redux"
import SearchIcon from "@mui/icons-material/Search"

import UseThemeMode from "@hooks/use-theme"
import UseProducts from "@hooks/use-products"
import { handleSearchChange, handleSearchValue } from "@state/slices/search"
import { setPage } from "@state/slices/page"
import { SearchBox, SearchButton, StyledAutocomplete } from "@styles/search"
import { useSearchParams } from "react-router-dom"

const Search = ({ headerColor }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()

  const { searchChange } = useSelector((state) => state.search)
  const dispatch = useDispatch()
  const [mysearch, setMySearch] = useState(searchChange)

  const { products } = UseProducts()
  const { themeMode } = UseThemeMode()

  const updateSearch = (searchValue) => {
    if (searchValue === "") {
      const newParams = Object.fromEntries(searchParams.entries())
      delete newParams.search
      setSearchParams(newParams)
    } else {
      setSearchParams({ search: searchValue })
    }
  }

  const handleInputChange = (event, value) => {
    const inputValue = value || event?.target?.value
    setMySearch(inputValue)
    if (!inputValue) {
      setMySearch("")
      dispatch(setPage(1))
      updateSearch("")

      if (headerColor) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        })
      }
    }
  }

  const handleSkillSelect = (event, value) => {
    if (value) {
      setMySearch(value)
      dispatch(setPage(1))
      updateSearch(value)
      if (headerColor) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        })
      }
    }
  }

  const handleSearchClick = () => {
    dispatch(setPage(1))
    updateSearch(mysearch)

    if (headerColor) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick()
    }
  }

  return (
    <SearchBox>
      <StyledAutocomplete
        freeSolo
        options={products}
        value={searchParams.get("search")?.split("+").join(" ")}
        onInputChange={handleInputChange}
        onChange={handleSkillSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            onKeyDown={handleKeyDown}
            placeholder={t("search-product")}
            InputProps={{
              ...params.InputProps,
              endAdornment: <>{params.InputProps.endAdornment}</>,
            }}
          />
        )}
      />
      <SearchButton onClick={handleSearchClick} aria-label="search">
        <SearchIcon />
      </SearchButton>
    </SearchBox>
  )
}

export default React.memo(Search)
