import React, { useState } from 'react'
import Icon from './Icon.jsx'

const Slider = ({media}) => {

    const [currentItem, setCurrentItem] = useState(0)
    const [opacity, setOpacity] = useState(1)

    const backItem = () => {
        setOpacity(0)
        setCurrentItem(oldCurentItem => oldCurentItem - 1)
        setTimeout(() => {
            setOpacity(1)
        }, 100);
    }

    const forwardItem = () => {
        setOpacity(0)
        setCurrentItem(oldCurentItem => oldCurentItem + 1)
        setTimeout(() => {
            setOpacity(1)
        }, 100);
    }
  return (
    <section className='slider-box' style={{ display: "flex", alignItems: "stretch", position: "relative", height: "auto" }}>
     {
                currentItem > 0 && (
                    <button
                        style={{
                            boxShadow: "none",
                            padding: 0,
                            position: "absolute",
                            backgroundColor: "rgba(255,255,255,0.2)",
                            height: "100%",
                            width: "60px"
                        }}
                        onClick={backItem}
                    >
                        <Icon name={'arrow_back_ios'} />
                    </button>
                )
            }
    {
                media.map((item, index) => (
                    index == currentItem && (
                        <div key={index} style={{
                            opacity: opacity,
                            transition: '.5s opacity ease-in-out',
                            width: "100%"
                        }}>
                            {
                                item.mimeType.startsWith('image') ?
                                    <img width={"100%"} src={item.url} alt="" />
                                    :
                                    <video width={"100%"} src={item.url} controls />
                            }
                        </div>
                    )
                ))
            }
            {
                currentItem < (media.length - 1) && (
                    <button
                        style={{
                            boxShadow: "none",
                            padding: 0,
                            position: "absolute",
                            right: 0,
                            backgroundColor: "rgba(255,255,255,0.2)",
                            height: "100%",
                            width: "60px"

                        }}

                        onClick={forwardItem}

                    ><Icon name={'arrow_forward_ios'} /></button>
                )
            }
    </section>
  )
}

export default Slider
