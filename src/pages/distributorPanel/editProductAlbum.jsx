import { useParams } from "react-router-dom"

function EditProductAlbum() {
    const { productId } = useParams()
    return (
        <>
            <div>edit product album</div>
            <div>{productId}</div>
        </>
    )
}
export default EditProductAlbum