import React from 'react'

export default function DetailsCard() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 p-2">
                    <img className="img-fluid detCard" src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-6 pt-2"> <img className="img-fluid childCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSXA7cZfSiDCpTVCQOniurqXnoMW5WY44RBmQ&usqp=CAU" /></div>
                        <div className="col-6 pt-2"> <img className="img-fluid childCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhFXUSMNjdiI_PESAiX1ou5IhOw0DwGufm6g&usqp=CAU" /></div>
                        <div className="col-6 pt-2"> <img className="img-fluid childCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQN26rpwgMGFDRR8pa5VnxwYmsp4zxOzOmUOQ&usqp=CAU" /></div>
                        <div className="col-6 pt-2"> <img className="img-fluid childCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSv35EAXq1avsPX49Q75KW2kLlOrVvAwb3mmQ&usqp=CAU" /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
