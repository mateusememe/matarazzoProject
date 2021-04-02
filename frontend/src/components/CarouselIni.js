import React from 'react'
import { Carousel } from 'react-bootstrap';

export default function CarouselIni(/* {data} */) {

    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://i.imgur.com/38GvigV.jpg" /* {data.banner1} */
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Primeiro Slide</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://i.imgur.com/0fUzsH4.jpg" /* {data.banner2} */
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Segundo Slide</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://i.imgur.com/TqSyt2W.jpg" /* {data.banner2} */
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Terceiro Slide</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}