import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { RootState } from '../../redux';
import { showForms } from '../../redux/FormRedux/FormActions';
import Button from '../Button/Button';
import { IIssueCard } from './FormTypes';
import { StyledConnectForm } from './StyledForm';
import { StyledPopupWrapper } from './StyledPopupWrapper';
import { blueColor, whiteColor } from '../GlobalStyle/StyledGlobal';
import { StyledInput, StyledLabel, StyledSelect } from './StyledFormComponents';
import { sendIssuesToAll } from '../../sockets/SocketsAPI';

const CreateIssueForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IIssueCard>({ mode: 'onChange' });

  const dispatch = useDispatch();
  const { isIssuesForm } = useSelector((state: RootState) => state.showForms);
  const gameID = useSelector((store: RootState) => store.initial.gameId);

  const onSubmit: SubmitHandler<IIssueCard> = (data) => {
    dispatch(showForms.showIssuesForm(!isIssuesForm));
    sendIssuesToAll(
      {
        issueTitle: data.issueTitle,
        issueLink: data.issueLink,
        issuePriority: data.issuePriority,
        issueID: nanoid(),
        current: false,
        isCompleted: false,
      },
      gameID,
    );
    reset();
  };

  const onShowConnectForm = () => {
    dispatch(showForms.showIssuesForm(!isIssuesForm));
  };

  return (
    <StyledPopupWrapper onMouseDown={onShowConnectForm}>
      <StyledConnectForm
        justifyContent="center"
        textAlign="center"
        padding="30px 0 50px"
        onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="legend-wrapper">
          <legend>Create Issue</legend>
        </div>
        <div className="create-issue-form-wrapper">
          <StyledLabel display="flex" maxWidth="570px" padding="0 0 40px 0">
            Title:
            <StyledInput
              maxWidth="420px"
              borderRadius="0px"
              margin="0 0 0 30px"
              {...register('issueTitle', { required: true, maxLength: 30 })}
            />
            {errors.issueTitle && <p className="error">Title is required</p>}
          </StyledLabel>

          <StyledLabel display="flex" maxWidth="570px" padding="0 0 40px 0">
            Link:
            <StyledInput
              maxWidth="420px"
              borderRadius="0px"
              margin="0 0 0 30px"
              {...register('issueLink', { required: false, maxLength: 100 })}
            />
          </StyledLabel>

          <StyledLabel display="flex" maxWidth="415px">
            Priority:
            <StyledSelect {...register('issuePriority')}>
              <option value="Low">Low</option>
              <option value="Middle">Middle</option>
              <option value="Hight">Hight</option>
            </StyledSelect>
          </StyledLabel>
        </div>
        <div className="connect-buttons-container">
          <Button text="Yes" color={whiteColor} colorBG={blueColor} onClick={() => onSubmit} />
          <Button colorBG={whiteColor} color={blueColor} text="No" onClick={onShowConnectForm} />
        </div>
      </StyledConnectForm>
    </StyledPopupWrapper>
  );
};

export default CreateIssueForm;
