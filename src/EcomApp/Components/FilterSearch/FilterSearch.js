import React from "react";

const FilterSearch=({setSearch,setGenderFilter,setPriceFilter})=>{

    const reset=()=>{
        setSearch("");
        setGenderFilter("");
        setPriceFilter("");
    }
    return(
        <div className="filter-container">
            <div className="filter-top-section">
                <h3>Filter</h3>
                <div className="filter-top-section-right">
                <div>
                    <select defaultValue="" onChange={(e)=>setGenderFilter(e.target.value)} className="select">
                        <option value="">
                            For
                        </option>
                        <option value="Male">
                            Male
                        </option>
                        <option value="Female">
                            Female
                        </option>
                    </select>
                    </div>
                    <div>
                    <select defaultValue="" onChange={(e)=>setPriceFilter(e.target.value)} className="select">
                        <option value="">
                            Price
                        </option>
                        <option value="100-500">
                            100-500
                        </option>
                        <option value="500-1000">
                            500-1000
                        </option>
                    </select>
                </div>
                <button onClick={reset} className="reset-btn">Reset</button>
                </div>
            </div>
            <div className="filter-search-bar">
                <input type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
            </div>
        </div>
    )
}
export default FilterSearch;