const IssueService = require( "../service/IssueService")

class IssueController {
   
    async addIssue (req, res){
        try {
           const {issueData, gameId} = req.body
           issueData.game_id = gameId
           const newIsu = await IssueService.createIssue(issueData)
           return res.status(200).json(newIsu) 
        } catch (error) {
            console.log(error)
        }
    }

    async updateIssue (req, res){
    try {
        const newIssueData = req.body
        const updatedIsu = await IssueService.updateIssue(newIssueData)
        return res.status(200).json(updatedIsu)
    } catch (error) {
        res.status(500).json(error)
    }
    }

    async getIssue (req, res){
        try {
            const {issueId} = req.params
            const issue = await IssueService.getIssue(issueId)
            return res.status(200).json(issue)
        } catch (error) {
            res.status(500).json(error)
        }   
    }

    async getAllIssues (req, res){
        try {
            const {gameId} = req.params
            const issues = await IssueService.getAllIssues(gameId)
            return res.status(200).json(issues)    
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async deleteIssue (req, res){
        try {
           const {issueId} = req.params
           console.log('in controller', issueId)
           const result = await  IssueService.deleteIssue(issueId)
           return res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async deleteAllIssues (req, res){
        try {
            const {gameId} = req.body
            const result = await IssueService.deleteAllIssues(gameId)
            return res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = IssueController