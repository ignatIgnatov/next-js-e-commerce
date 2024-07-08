import CommonListing from '@/components/CommonListing'
import { productByCategory } from '@/services/product'

const MenAllProducts = async () => {

    const getAllProducts = await productByCategory('men')

    return (
        <CommonListing data={getAllProducts && getAllProducts.data} />
    )
}

export default MenAllProducts