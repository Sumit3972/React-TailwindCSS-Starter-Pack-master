import React, { useState } from 'react';
import DetailMenu from './DetailMenu';


function MenuCard({ card ,resInfo }) {

    let checkcard = false;
    if (card["@type"]) {
        checkcard = true
    }

    const [isOpen, setisOpen] = useState(checkcard)

    function toogleDown() {
        setisOpen((prev => !prev))
    }

    if (card.itemCards) {
        const { title, itemCards } = card
        return (
            <>
                <div className='mt-8'>
                    <div className='flex  justify-between'>
                        <h1 className={`${card["@type"] ? "font-extrabold text-[18px] leading-[20px] tracking-[-0.3px] text-[rgba(2,6,12,0.92)] mb-4" : "font-bold text-[16px] leading-[19px] tracking-[-0.3px] text-[rgba(2,6,12,0.92)]"}`}>{title} ({itemCards.length})</h1>
                        <i
                            className={`fi text-xl fi-rr-angle-small-${isOpen ? 'up' : 'down'}`}
                            onClick={toogleDown}
                        ></i>
                    </div>
                    {
                        isOpen && <DetailMenu itemCards={itemCards} resInfo={resInfo} />
                    }

                </div>
                <hr className={`${card["@type"] ? "h-[16px] border-b-[16px] border-b-[rgba(2,6,12,0.05)]" : "border-b-[0.5px] border-[#d3d3d3] h-[0.5px] my-[20px]"}`} />
            </>
        );
    } else {
        const { title, categories } = card
        return (
            <>
                <div>
                    <h1 className='font-extrabold text-[18px] leading-[20px] tracking-[-0.3px] text-[rgba(2,6,12,0.92)] mt-4'>{title}</h1>
                    {
                        categories.map((data) => (
                            <MenuCard card={data}  />
                        ))
                    }
                </div>
                {/* <hr className='h-[16px] border-b-[16px] border-b-[rgba(2,6,12,0.05)]'/>*/}
            </>
        )
    }

}

export default MenuCard;
