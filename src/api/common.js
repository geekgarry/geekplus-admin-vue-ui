import request from '@/utils/request'

//上传图片文件
export function uploadFile(formData) {
    return request({
      url: '/geekplus/articles/uploadFile',
      method: 'post',
      data: formData,
      headers:{'Content-Type': 'multipart/form-data'}
    })
  }
  
  // 获取某个文件夹下的图片list,批量删除
  export function deleteFileList(filePath) {
    return request({
      url: '/geekplus/articles/deleteFileList',
      method: 'post',
      data:filePath
    })
  }
  
  // 获取某个文件夹下的图片list，删除
  export function deleteFileForArticle(filePath) {
    return request({
      url: '/geekplus/articles/deleteFile',
      method: 'get',
      params:filePath
    })
  }

  // 删除图片资源
export function deleteFile(params) {
  return request({
    url: '/common/deleteFile',
    method: 'get',
    params:params
  })
}

//获取二维码
export function getQRCodeImg(textStr){
  let queryParams={qrCodeText: textStr}
  return request({
    url: '/common/getQRCode',
    method: 'get',
    params: queryParams
  })
}