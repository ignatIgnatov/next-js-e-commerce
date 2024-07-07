import { getAllAdminProducts } from "@/services/product"

const { default: CommonListing } = require("@/components/CommonListing")


const AdminAllProducts = async () => {

  const allAdminProducts = await getAllAdminProducts();

  return (
    <CommonListing data={allAdminProducts && allAdminProducts.data} />
  )
}

export default AdminAllProducts