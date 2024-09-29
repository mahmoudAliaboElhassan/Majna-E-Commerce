import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { getAlbumItems } from '@state/slices/album'
import { useParams } from 'react-router-dom'

function Albums() {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const {albumItems,loadingGetAlbumItems}=useSelector((state)=>state.album)
    useEffect(() => {
        dispatch(getAlbumItems({ productId: productId }))
    }, [])
    return (
        <div>Album</div>
    )
}

export default Albums