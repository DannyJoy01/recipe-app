import React from 'react'

const SideBar = () => {
  return (
    <div>
        <h2 className="text-xl font-semibold">User Dashboard Sidebar</h2>
        <ul className="mt-4">
            <li className="py-2 px-4 hover:bg-gray-100">Profile</li>
            <li className="py-2 px-4 hover:bg-gray-100">Recipes</li>
            <li className="py-2 px-4 hover:bg-gray-100">Settings</li>
        </ul>
    </div>
  )
}

export default SideBar;
