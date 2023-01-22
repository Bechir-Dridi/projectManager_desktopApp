import React from 'react'
import "./index.css"
import { Link } from 'react-router-dom'

export default function Nav() {
    // const [focused, setFocused] = useState(false)
    return (
        <div>
            <nav>
                {/* <a href='/'>Projects</a> */}
                <div className="link">
                    <Link
                        // onClick={() => setFocused(!focused)} style={!focused ? { color: "rgb(55, 221, 251)", borderBottom: "4px solid #3cd2fb" } : {}}
                        to='/'>projects
                    </Link>
                </div>

                <div className="link">
                    <Link
                        // onClick={() => setFocused(!focused)} style={focused ? { color: "rgb(55, 221, 251)", borderBottom: "4px solid #3cd2fb" } : {}}
                        to='/NP'>new project
                    </Link>
                </div>
            </nav >
        </div >
    )
}
