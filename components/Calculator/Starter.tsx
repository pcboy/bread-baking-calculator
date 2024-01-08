import * as React from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import { observer } from 'mobx-react'
import { CalcStoreContext } from '../../stores/CalculatorStore'
import { handleChangeNumber, stripHTML } from './Utils'
import ContentEditable from 'react-contenteditable'
import { NumericFormat } from 'react-number-format'

export const Starter: React.FC = observer(() => {
  const calcstore = React.useContext(CalcStoreContext)

  return (
    <div className="grid grid-cols-1 grid-flow-col md:grid-cols-2">
      <div>
        Starter in percentage of total weight (
        <NumericFormat
          displayType="input"
          valueIsNumericString
          className="underline decoration-dotted mr-1"
          onValueChange={(values) =>
            calcstore.setStarterRatio(parseInt(values.value))
          }
          onFocus={(e) => e.target.select()}
          allowNegative={false}
          thousandSeparator=" "
          size={4}
          allowedDecimalSeparators={[',', '.']}
          defaultValue={calcstore.starterRatio}
          value={calcstore.starterRatio}
          type="text"
          suffix={' %'}
        />
        hydration starter)
      </div>
      <div>
        <Input
          type="number"
          className="w-full"
          value={calcstore.starterPerc}
          onFocus={(e) => e.target.select()}
          onChange={(e) =>
            calcstore.changeAttribute('starterPerc', handleChangeNumber(e))
          }
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
        />
        <div className="weight">{calcstore.starterWeight} grams</div>
        <FormControl className="w-full">
          <InputLabel htmlFor="age-native-simple">
            Which Flour did you use?
          </InputLabel>
          <Select
            data-testid="starterFlourSelect"
            native
            value={calcstore.starterFlourIndex}
            onChange={(e: React.ChangeEvent<any>) => {
              calcstore.setStarterFlour(parseInt(e.target.value))
            }}
          >
            {calcstore.flours.map((flour, index: number) => (
              <option key={`flour_${index}`} value={index}>
                {stripHTML(flour.name)}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  )
})
