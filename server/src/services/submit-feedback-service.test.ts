import { SubmitFeedbackService } from "./submit-feedback-service"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)


describe('SubmitFeedback', () => {
    it('shoud be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemplo',
            screenshot: 'data:image/png;base64'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })
    it('shoud bot be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'exemplo',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    })
    it('shoud bot be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    })
    it('shoud bot be able to submit a feedback without sreenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemplo',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    })
})