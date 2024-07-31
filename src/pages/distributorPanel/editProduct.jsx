import React from 'react'
import { useParams } from 'react-router-dom'

function EditProduct() {
    const { productId } = useParams();
    console.log(productId)
    return (
        <div>
            EditProduct
            {productId}
        </div>
    )
}

export default EditProduct
