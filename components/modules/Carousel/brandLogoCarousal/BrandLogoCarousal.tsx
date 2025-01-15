import React from 'react'
import { Flex, Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { createStyle } from "./BrandLogoCarousal.style";
import I18nFlex from '@/components/elements/I18nFlex/I18nFlex';


function BrandLogoCarousal(props: { carouselMultipleIamgeData: any }) {
    const useStyles = createStyle();
    const { classes } = useStyles();
    return (
        <>
            <Carousel
                dir={'ltr'}
                height={47}
                slideSize="10%"
                loop
                align="start"
                breakpoints={[
                    { maxWidth: 'lg', slideSize: '10%', slideGap: "10px" },
                    { maxWidth: 'md', slideSize: '17%', slideGap: "10px" },
                    { maxWidth: 'sm', slideSize: '20%', slideGap: "4px" },
                    { maxWidth: 'xs', slideSize: '50%', slideGap: "2px" },
                ]}
                classNames={{
                    control: classes.control
                }}
            >
                {props.carouselMultipleIamgeData.map((item: any, id: any) => (
                    <Carousel.Slide key={id} classNames={classes.crouselSlide}>
                        <I18nFlex className={classes.slideBox}>
                            <Image src={item.Image} width={"20px"} />
                        </I18nFlex>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </>
    )
}

export default BrandLogoCarousal