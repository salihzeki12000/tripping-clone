import React from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import '../../Components/SearchBar/SearchBar.css'


export default function HomeSearchBar() {
    return (
        <div>

            <div className='background'>
                <div className='div container-fliud-md text-center '>
                    <br />
                    <br />
                    <br />
                    <br />

                    <p className='text-white text_size font-weight-bold mt-md-5 pt-md-5 p-1' >Search hundreds of travel sites at once</p>
                    <p className='font-weight-bold text-white mt-md-2'>Your next holiday - just one click away!</p>
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}
