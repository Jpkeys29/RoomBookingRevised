import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const Post = ({ p }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ margin: "3%", width: "70vw" }}>
        <CardContent>
          <div>
            <p>Postings</p>
            <Typography>{p?.title}</Typography>
            <Typography>{p?.address}</Typography>
            <Typography>{p?.price}</Typography>
            <Typography>{p?.description}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Post
