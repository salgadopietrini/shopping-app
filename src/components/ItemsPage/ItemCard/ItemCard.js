import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleSelect = () => {
    props.selectItem(props.info.id);
    setOpen(true);
    setAdded((prevValue) => prevValue + 1);
  };

  const handleRemove = () => {
    props.removeItem(props.info.id);
    setOpen(false);
    setAdded(0);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={
          props.info.title.length > 17
            ? props.info.title.slice(0, 17) + "..."
            : props.info.title
        }
        subheader={props.info.category}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.info.image}
        alt={props.info.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Price: $ {props.info.price}
        </Typography>
        <Rating
          name="read-only"
          value={props.info.rating.rate}
          precision={0.5}
          size="small"
          readOnly
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={handleSelect}
        >
          <AddShoppingCartIcon />
        </IconButton>

        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleRemove}
                >
                  <Button color="inherit" size="small">
                    UNDO
                  </Button>
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {added === 1 ? "Added" : "Already in cart"}
            </Alert>
          </Collapse>
        </Box>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <b>{props.info.title}</b>
          </Typography>
          <Typography paragraph>{props.info.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
