import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Models from './Models';
import { Button } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Style from './Models.module.css'
import { useState } from 'react';

const HarderThanUCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const responsive = {
        0: { items: 1 },
        720: { items: 1 },
        1024: { items: 1 }
    };

    const slidePrev = () => setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    const slideNext = () => setActiveIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 1));

    const syncActiveIndex = ({ item }) => setActiveIndex(item);

    const items = [1, 2, 3, 4, 5].map((item) => <Models key={item} />);

    return (
        <div style={{ position: 'relative' }}>
            <AliceCarousel
                items={items}
                disableButtonsControls
                //infinite
                responsive={responsive}
                disableDotsControls
                onSlideChanged={syncActiveIndex}
                activeIndex={activeIndex}
            />

            {activeIndex < items.length - 1 && (
                <Button
                    variant='contained'
                    className={`${Style.scroll} next-button`}
                    onClick={slideNext}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '0',
                        marginRight: '70px',
                        transform: 'translateY(-50%)',
                        zIndex: 99,
                        borderRadius: '25px',
                        background: "black",
                        '&:hover:before': {
           background: 'red'
          },
                    }}
                    aria-label="next"
                >
                    <KeyboardArrowRight sx={{background: "black"}}/>
                </Button>
            )}

            {activeIndex > 0 && (
                <Button
                    onClick={slidePrev}
                    variant='contained'
                    className={`${Style.scroll} next-button`}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '0',
                        marginLeft: '70px',
                        transform: 'translateY(-50%)',
                        zIndex: 99,
                        borderRadius: '25px',
                        background: "black"
                    }}

                    aria-label='previous'
                >
                    <KeyboardArrowLeft/>
                </Button>
            )}
        </div>
    );
};

export default HarderThanUCarousel;