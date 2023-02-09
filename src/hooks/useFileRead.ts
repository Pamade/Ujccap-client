import {useState, useEffect} from "react"
import {toast} from "react-toastify"
 export const useFileRead = () => {
    const imageMimeType = /image\/(png|jpg|jpeg)/i;

    const [file, setFile] = useState<File | null>(null)
    const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer | null>(null)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        let fileTemp:File|null = null
        if (!e.target.files) {
            return;
          }
        fileTemp = e.target.files[0]
        
        if (!fileTemp?.type.match(imageMimeType)){
            return toast.error("Image mime type is not valid")
        }        
        setFile(fileTemp)
    }

    useEffect(() => {
        let fileReader: FileReader | false = false;
        let isCancel = false;

        if (file) {
            fileReader = new FileReader()
            fileReader.onload = (e) => {
                const result = e.target?.result
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file)
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort()
            }
        }
    }, [file])
    return {fileDataURL,setFileDataURL, file, handleChange}
}