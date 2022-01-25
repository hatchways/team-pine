import { Box, Typography, Checkbox, Avatar } from '@mui/material';
import { useStyles } from './useStyles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { useEffect, useState } from 'react';

interface PaymentCardProps {
  brand: string;
  isDefault: boolean;
  last4: string;
  expireMonth: number;
  expireYear: number;
  cardHolderName: string | null;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  brand,
  isDefault,
  last4,
  expireMonth,
  expireYear,
  cardHolderName,
}) => {
  cardHolderName = cardHolderName || '';
  const classes = useStyles();
  const [cardTypeLogo, setCardTypeLogo] = useState<string>();
  useEffect(() => {
    if (brand === 'visa') {
      setCardTypeLogo('https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png');
    } else if (brand === 'mastercard') {
      setCardTypeLogo(
        'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_rev_92px_2x.png',
      );
    }
  }, [brand]);
  return (
    <Box
      marginRight={5}
      marginBottom={5}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      className={classes.root}
    >
      <Box display="flex" justifyContent="space-between">
        <Avatar sx={{ width: 75, height: 40 }} variant="square" src={cardTypeLogo} />
        <Checkbox color="primary" checked={isDefault} icon={<CircleOutlinedIcon />} checkedIcon={<CheckCircleIcon />} />
      </Box>
      <Box>
        <Typography fontSize="large" fontWeight="bold">
          **** **** **** {last4}
        </Typography>
        <Typography fontSize="small">
          Exp. Date {expireMonth}/{expireYear}
        </Typography>
      </Box>
      <Typography fontWeight="bold">{cardHolderName}</Typography>
    </Box>
  );
};
export default PaymentCard;
