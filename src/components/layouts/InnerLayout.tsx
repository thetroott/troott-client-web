import { Outlet } from "react-router-dom"


const InnerLayout = () => {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Inner Layout</h2>
      <Outlet />
    </div>
  )
}

export default InnerLayout
