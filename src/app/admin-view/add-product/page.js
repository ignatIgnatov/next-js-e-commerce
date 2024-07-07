'use client'

import { GlobalContext } from "@/app/context"
import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent"
import TileComponent from "@/components/FormElements/TileComponent"
import ComponentLevelLoader from "@/components/Loader/componentLevelLoader"
import Notification from "@/components/Notification"
import { addNewProduct, updateAProduct } from "@/services/product"
import {
  AvailableSizes,
  adminAddProductformControls,
  firebaseConfig,
  firebaseStorageUrl
} from "@/utils"
import { initializeApp } from 'firebase/app'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageUrl);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`
}

const helperForUploadingImageToFirwbase = async (file) => {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      'state_changed',
      (snapshot) => { },
      (error) => {
        console.log(error)
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then(downloadUrl => resolve(downloadUrl))
          .catch(error => reject(error))
      })
  })
}

const initialFormData = {
  name: '',
  price: 0,
  description: '',
  category: 'men',
  sizes: [],
  deliveryInfo: '',
  onSale: 'no',
  imageUrl: '',
  priceDrop: 0
}

const AdminAddNewProduct = () => {

  const [formData, setFormData] = useState(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader, currentUpdatedProduct, setCurrentUpdatedProduct } = useContext(GlobalContext);
  const router = useRouter();

  const handleImage = async (event) => {
    const extractImageFromUrl = await helperForUploadingImageToFirwbase(event.target.files[0]);

    if (extractImageFromUrl != '') {
      setFormData({
        ...formData,
        imageUrl: extractImageFromUrl
      });
    }
  }

  function handleTileClick(getCurrentItem) {
    let copySizes = [...formData.sizes];
    const index = copySizes.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      copySizes.push(getCurrentItem);
    } else {
      copySizes = copySizes.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      sizes: copySizes,
    });
  }

  const handleAddProduct = async () => {
    setComponentLevelLoader({ loading: true, id: '' })
    const res = currentUpdatedProduct !== null
      ? await updateAProduct(formData)
      : await addNewProduct(formData);

    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: '' });
      toast.success(res.message, { position: 'top-right' });

      setCurrentUpdatedProduct(null);
      setFormData(initialFormData);
      setTimeout(() => {
        router.push('/admin-view/all-products')
      }, 1000)

    } else {
      setComponentLevelLoader({ loading: false, id: '' })
      toast.error(res.message, { position: 'top-right' });
      setFormData(initialFormData);
    }
  }

  useEffect(() => {
    if (currentUpdatedProduct !== null) {
      setFormData(currentUpdatedProduct);
    }
  }, [currentUpdatedProduct]);

  return (
    <div className="w-full mt- mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <input
            accept="image/*"
            max={'1000000'}
            type="file"
            onChange={handleImage}
          />

          <div className="flex gap-6 flex-col">
            <label>Available sizes</label>
            <TileComponent
              selected={formData.sizes}
              onClick={handleTileClick}
              data={AvailableSizes} />
            {
              adminAddProductformControls.map(controlItem =>
              (
                controlItem.componentType === 'input' ?
                  <InputComponent
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    label={controlItem.label}
                    value={formData[controlItem.id]}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [controlItem.id]: event.target.value
                      })
                    }}
                  /> :
                  controlItem.componentType === 'select' ?
                    <SelectComponent
                      label={controlItem.label}
                      options={controlItem.options}
                      value={formData[controlItem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value
                        })
                      }}
                    /> : null
              )
              )
            }
            <button
              onClick={handleAddProduct}
              className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
            >
              {
                componentLevelLoader && componentLevelLoader.loading ?
                  <ComponentLevelLoader
                    text={currentUpdatedProduct !== null ? "Updating product" : "Adding product"}
                    color={"#ffffff"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  /> :
                  (
                    currentUpdatedProduct !== null
                      ? 'Update Product'
                      : 'Add product'
                  )
              }
            </button>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  )
}

export default AdminAddNewProduct