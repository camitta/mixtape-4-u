import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleSong} from '../store/singleSong'
import {addSongToCart, fetchCart} from '../store/cart'
import {createNewOrder} from '../store/orders'
import {Container, Row, Card, Col, Button} from 'react-bootstrap'
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css'

class SingleSong extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    try {
      this.props.fetchSingleSong(this.props.match.params.songId)
      this.props.loadCart()
    } catch (error) {
      console.log(error)
    }
  }

  handleClick(songId) {
    const currentMixtape = this.props.cart[0]
    if (currentMixtape) {
      this.props.addSongToCart(songId, currentMixtape.id)
      toast.notify('Added to cart!', {
        position: 'top-right'
      })
    } else {
      toast.notify('Please login or sign up to start creating a mixtape', {
        position: 'top-right'
      })
    }
  }

  render() {
    const song = this.props.song
    return (
      <Container fluid>
        <Row>
          <h1>
            {song.name} by {song.artist}
          </h1>
        </Row>
        <Row>
          <Col xs={4}>
            <Card style={{backgroundColor: '#403F4C', color: '#ffffff'}}>
              <Card.Img variant="top" src={song.imageUrl} />
              <Card.Body>
                <Card.Title>
                  <b>Album: </b>
                  {song.album}
                </Card.Title>
                <Card.Subtitle>
                  <b>Year: </b>
                  {song.year}
                </Card.Subtitle>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="secondary"
                  type="submit"
                  className="add-song"
                  onClick={() => this.handleClick(song.id)}
                  style={{
                    backgroundColor: '#A06CD5',
                    border: 'none',
                    height: '50px',
                    width: '50px',
                    borderRadius: '25px'
                  }}
                >
                  <i className="fas fa-cart-plus" />
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <iframe
              src={song.songUrl}
              width="500"
              height="250"
              frameBorder="0"
              allow="encrypted-media"
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    song: state.singleSong,
    cart: state.cartReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleSong: id => dispatch(fetchSingleSong(id)),
    loadCart: () => dispatch(fetchCart()),
    addSongToCart: (songId, mixtapeId) =>
      dispatch(addSongToCart(songId, mixtapeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleSong)
