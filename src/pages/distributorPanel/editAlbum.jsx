import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getAlbumItem } from '@state/slices/album'

function EditAlbum() {
    const { productId, albumId } = useParams()
    const dispatch = useDispatch()
    const { loadingSpecifiedAlbumItem, imgUrl, imgIsCover } = useSelector((state) => state.album)
    useEffect(() => {
        dispatch(getAlbumItem({ productId, albumId }))
    }, [])
    return (
        <div>{productId}  {albumId} <img src={imgUrl} /></div>
    )
}

export default EditAlbum