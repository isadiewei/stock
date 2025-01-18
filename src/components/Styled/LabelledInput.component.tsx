import './LabelledInput.css'
import { LabelledInputProps } from "./Styled.model"
import { StyledInput } from "./StyledInput.component"

export const LabelledInput = (props: LabelledInputProps) => {
  return (
    <div className="labelled-input">
      <p className="label">{props.label}</p>
      <StyledInput value={props.value} onChange={e => props.onChange(e)}></StyledInput>
    </div>
  )
}