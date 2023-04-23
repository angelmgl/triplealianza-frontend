"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RxDotFilled } from "react-icons/rx";
import classNames from "../helpers/classNames";
import Button from "./Button";
import { SlideType } from "../types";

interface Props {
    items: SlideType[];
}

const Slider: React.FC<Props> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === items.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const [startTouch, setStartTouch] = useState<{
        x: number;
        y: number;
    } | null>(null);

    const handleTouchStart = (event: React.TouchEvent) => {
        const touch = event.touches[0];
        setStartTouch({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = (event: React.TouchEvent) => {
        if (!startTouch) {
            return;
        }

        const touch = event.changedTouches[0];
        const diffX = touch.clientX - startTouch.x;
        const diffY = touch.clientY - startTouch.y;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }

        setStartTouch(null);
    };

    return (
        <div
            className="h-[500px] w-full relative group text-light"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div
                style={{
                    backgroundImage: `url(${items[currentIndex].image.image})`,
                }}
                id="home-slider"
                className="w-full h-full bg-center bg-cover duration-500 flex items-center justify-center"
            >
                {items.map((item, index) => (
                    <article
                        className={classNames(
                            currentIndex !== index,
                            "flex flex-col items-center max-w-[500px] relative z-10 px-4",
                            "hidden"
                        )}
                        key={item.id}
                    >
                        <h2 className="text-4xl font-semibold text-center">
                            {item.title}
                        </h2>
                        <p className="text-center my-4">{item.description}</p>
                        <Button
                            url={item.button_url}
                            label={item.button_label}
                        />
                    </article>
                ))}
            </div>
            {/* left arrow */}
            <div
                onClick={prevSlide}
                className="md:hidden group-hover:block z-20 absolute bottom-1 md:bottom-auto md:top-[50%] md:-translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-light/10 hover:bg-light/50 hover:text-wine transition-all text-white cursor-pointer"
            >
                <FiChevronLeft className="lg:text-4xl" />
            </div>
            {/* right arrow */}
            <div
                onClick={nextSlide}
                className="md:hidden group-hover:block z-20 absolute bottom-1 md:bottom-auto md:top-[50%] md:-translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-light/10 hover:bg-light/50 hover:text-wine transition-all text-white cursor-pointer"
            >
                <FiChevronRight className="lg:text-4xl" />
            </div>
            {/* pagination */}
            <div className="flex absolute bottom-2 left-[50%] -translate-x-[50%] justify-center py-2">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="text-2xl cursor-pointer"
                        onClick={() => setCurrentIndex(index)}
                    >
                        <RxDotFilled
                            className={
                                index === currentIndex
                                    ? "text-wine-light hover:text-wine-dark"
                                    : "hover:text-wine-dark"
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
