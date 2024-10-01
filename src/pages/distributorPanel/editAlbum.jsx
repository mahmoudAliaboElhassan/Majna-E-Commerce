import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Container, Box, Typography, InputLabel, IconButton } from '@mui/material'
import { CloudUpload, CheckCircleOutline } from '@mui/icons-material';
import { toast } from 'react-toastify'

import { getAlbumItem, updateAlbumItem } from '@state/slices/album'
import UseThemMode from "@hooks/use-theme";

function EditAlbum() {
    const [updateCover, setUpdateCover] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const { productId, albumId } = useParams()
    const dispatch = useDispatch()
    const { themeMode } = UseThemMode()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { loadingUpdateImageCover, imgUrl, imgIsCover,flag } = useSelector((state) => state.album)

    useEffect(() => {
        dispatch(getAlbumItem({ productId, albumId }))
    }, [dispatch, productId, albumId,flag])

    const handleChangeCover = () => {
        setUpdateCover(true)
        dispatch(updateAlbumItem({ productId, albumId, is_cover: "True" })).unwrap()
            .then(() => {
                toast.success(t("image-cover-changed"), {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: themeMode,
                });
                // navigate(`/distributor-control-panel/albums/${productId}`)
            })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file && file.size < 5000000 && ['image/jpeg', 'image/png'].includes(file.type)) { // Example validation
            dispatch(updateAlbumItem({ productId, albumId, image: file })).unwrap()
                .then(() => {
                    toast.success(t("image-updated"), {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: themeMode,
                    });
                    // navigate(`/distributor-control-panel/albums/${productId}`)
                })
        } else {
            toast.error(t("invalid-file"), {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: themeMode,
            });
        }
    }
    const inputFileRef = useRef(null);
    const handleIconClick = () => {
        inputFileRef.current.click();
    };
    return (
        <Container>
            <Box
                sx={{
                    width: "80%",
                    margin: "auto",
                    textAlign: "center",
                    padding: "20px 0"
                }}>
                <img
                    src={imgUrl}
                    alt="Album Cover"
                    style={{
                        width: "100%",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                    }}
                />
                <Typography
                    sx={{ marginTop: 2, fontWeight: 500, fontSize: '1.2rem' }}>
                    {imgIsCover ? t("img-is-cover") : t("img-isnot-cover")}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: "20px 0"
                }}>
                <InputLabel htmlFor="file-upload">
                    <IconButton
                        onClick={handleIconClick}
                        component="label"
                        sx={{
                            borderRadius: 4,
                            padding: 2,
                            color: themeMode === "dark" ? "white" : "primary.main",
                            backgroundColor: themeMode === "dark" ? "rgba(255, 255, 255, 0.08)" : "#f1f1f1",
                            '&:hover': {
                                backgroundColor: themeMode === "dark" ? "rgba(255, 255, 255, 0.12)" : "#e0e0e0"
                            },
                            boxShadow: "0 3px 6px rgba(0,0,0,0.16)"
                        }}>
                        <CloudUpload fontSize="large" />
                    </IconButton>
                </InputLabel>
                <input
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    accept="image/png, image/jpeg"
                    ref={inputFileRef}
                />
                <Typography
                    sx={{ marginTop: 2, color: themeMode === "dark" ? "#fff" : "#000" }}>
                    {selectedFile ? selectedFile.name : t("upload-new-image")}
                </Typography>
            </Box>

            {!imgIsCover &&
                <Button
                    onClick={handleChangeCover}
                    disabled={loadingUpdateImageCover && updateCover}
                    fullWidth
                    sx={{
                        marginTop: 2,
                        padding: 1.5,
                        fontWeight: 600
                    }}
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    startIcon={<CheckCircleOutline />}
                >
                    {t("change-to-cover")}
                </Button>
            }
        </Container>
    )
}

export default EditAlbum
