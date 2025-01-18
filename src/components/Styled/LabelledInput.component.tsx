import { LabelledInputProps } from "./Styled.model"
import { StyledInput } from "./StyledInput.component"
import './LabelledInput.css'

export const LabelledInput = (props: LabelledInputProps) => {
  return (
    <div className="labelled-input">
      <p className="label">{props.label}</p>
      <StyledInput value={props.value} onChange={e => props.onChange(e)}></StyledInput>
    </div>
  )
}