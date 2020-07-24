import React from 'react'

export default function Amenities() {
    let amenites = ['Pet allowed', 'Kitchen', 'TV', 'DishWasher', 'Microwave', 'Jacuzzi', 'No pets', 'Wheelchair access',
        'Pool', 'Air conditioning', 'Balcony/Patio', 'Grill', 'No smoking', 'Sauna', 'Fishing', 'Fenced', 'Internet',
        'Washer', 'Parking', 'Yard', 'Fireplace', 'Smoking allowed', 'Crib', 'Detached'
    ]
    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <table>
                        <tr>
                            <td><p className="text-muted">Bedrooms</p></td>
                            <td><button>-</button></td>
                            <td> <p>{}</p></td>
                            <td><button>+</button></td>
                        </tr>
                    </table>
                </div>
                <div className="col-6">
                    <table>
                        <tr>
                            <td><p className="text-muted">Bathrooms</p></td>
                            <td><button>-</button></td>
                            <td> <p>{}</p></td>
                            <td><button>+</button></td>
                        </tr>
                    </table>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                {
                    amenites.map(amenite => {
                        return (
                            <div className="col-4">
                                <table>
                                    <tr>
                                        <td className="p-2" style={{ width: '5px', height: 'auto' }}><input type="checkbox" /></td>
                                        <td className="p-2"><p>{amenite}</p></td>
                                    </tr>
                                </table>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}