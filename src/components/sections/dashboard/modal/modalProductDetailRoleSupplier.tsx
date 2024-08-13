// import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FlattenedProductInWarehouseRoleSeller, ProductType } from 'data/dashboard/table';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '700px',
  overflow: 'scroll',
};

interface Props {
  open: boolean;
  data?: ProductType | null;
  onClose: () => void;
}

// const fetchSupplierProfile = async (supplierId?: number | null): Promise<SupplierProfile> =>
//   await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/suppliers/${supplierId}`).then((res) => {
//     return res.json();
//   });

export default function ProducInDetailModalRoleSupplier(props: Props) {
  const { onClose, open, data } = props;
  // const { data: supplierProfile, isError } = useQuery<SupplierProfile>({
  //   queryKey: ['supplierProfile', productDetail?.productSupplierId],
  //   queryFn: () => {
  //     return fetchSupplierProfile(productDetail?.productSupplierId);
  //   },
  // });

  // if (isError || !supplierProfile) {
  //   return <Typography>Lỗi tải dữ liệu nhà phân phối</Typography>;
  // }

  const handleClose = () => onClose();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Chi tiết sản phẩm
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Số lượng: {data?.quantity}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Đơn vị: {data?.productWeight}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tên sản phẩm: {data?.productName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tên thương hiệu: {data?.productBrand}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Nguồn gốc sản phẩm: {data?.productOrigin}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Cách trồng: {data?.productPlanting}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Đặc tính gạo: {data?.characteristic}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Hạt giống: {data?.seed}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Cách nấu: {data?.cook}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ghi chú: {data?.note}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ngày trồng: {data?.plantingDate?dayjs(data?.plantingDate).format('DD/MM/YYYY') : ''}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Ngày thu hoạch: {data?.harvestDate?dayjs(data?.harvestDate).format('DD/MM/YYYY') : ''}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Chứng nhận sản phẩm: {data?.productCertification}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Cam kết sản phẩm: {data?.productCommit}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
