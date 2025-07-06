
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ProgressButtons() {

    const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1) // goes back one page in history
  }

  const handleContinue = () => {
    navigate("/onboarding")
  }

  return (
    <div>
        <div className="flex justify-between mt-8 pt-6 border-t gap-4">
          <Button
          variant="ghost"
            onClick={handleBack}
            className="px-6 py-2 transition-colors cursor-pointer"
          >
             <ChevronLeft size={16} />
            Back
          </Button>
          <Button
            onClick={handleContinue}
            className="px-12 cursor-pointer transition-colors"
            
          >
            Continue
          </Button>
        </div>
      
    </div>
  )
}

export default ProgressButtons
