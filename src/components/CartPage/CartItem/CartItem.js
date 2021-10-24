import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CartItem(props) {
  const handleAdd = () => {
    props.handleQuantity(props.info.id, 1);
  };

  const handleRemove = () => {
    props.handleQuantity(props.info.id, -1);
  };

  return (
    <Card sx={{ display: "flex" }}>
      <div style={{ width: "150px", paddingLeft: "15px" }}>
        <CardMedia
          component="img"
          sx={{
            objectFit: "fill",
            width: 100,
            height: 100,
            borderRadius: "50%",
          }}
          image={props.info.image}
          alt="Product"
        />
      </div>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.info.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" component="div">
            Price: $ {props.info.price * props.info.quantity}
          </Typography>
        </CardContent>

        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Typography variant="h6" color="text.secondary" component="div">
            Quantity:
          </Typography>
          <IconButton>
            <RemoveIcon onClick={handleRemove} />
          </IconButton>
          <Typography component="div" variant="h5">
            {props.info.quantity}
          </Typography>
          <IconButton>
            <AddIcon onClick={handleAdd} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
