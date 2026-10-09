import { Button } from "./components/Buttons"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {
  return (
    <>
    <Button 
      startIcon={<ShareIcon size={"lg"} />} 
      size="sm" 
      variant="primary" 
      text="Share"
    ></Button>

    <Button 
      startIcon={<PlusIcon size={"lg"} />}
      size="md" 
      variant="secondary" 
      text="Add content"
    ></Button>
    </>
  )
}

export default App
 