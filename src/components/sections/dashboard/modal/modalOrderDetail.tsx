// import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DistributorProfileType } from 'data/dashboard/table';
import { useQuery } from '@tanstack/react-query';
import { FlattenOrderData } from '../transactions/OrdersToSupplierTransactionTableRoleDistributor';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  orderDetail?: FlattenOrderData | null;
  onClose: () => void;
}

const fetchDistributorProfile = async (userId: number): Promise<DistributorProfileType> =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/distributors/${userId}`).then((res) => {
    return res.json();
  });

export default function OrderDetailModal(props: Props) {
  const { onClose, open, orderDetail } = props;
  const { data: profileDistributor, isError } = useQuery<DistributorProfileType>({
    queryKey: ['distributor', orderDetail?.distributorId],
    queryFn: () => fetchDistributorProfile(orderDetail!.distributorId),
  });

  if (isError || !profileDistributor) {
    return <Typography>Lỗi tải dữ liệu nhà phân phối</Typography>;
  }

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
            Chi tiết đơn đặt hàng
          </Typography>
          <Typography id="modal-modal-description">Mã đơn hàng: {orderDetail?.id}</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Mã sản phẩm: {orderDetail?.productId}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tên sản phẩm: {orderDetail?.productName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Số lượng: {orderDetail?.quantity}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tên người đặt: {profileDistributor.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            SĐT: {profileDistributor.phoneNumber}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Địa chỉ: {profileDistributor.address}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Email: {profileDistributor.email}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
